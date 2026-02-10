import Stripe from 'stripe';

// Stripe 클라이언트 (서버 사이드 전용)
// 환경 변수가 없으면 null (나중에 설정 가능)
export const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2026-01-28.clover',
        typescript: true,
    })
    : null;

// Toss Payments 설정 (준비용 - 현재 주석 처리)
/*
export const tossConfig = {
    clientKey: process.env.TOSS_CLIENT_KEY,
    secretKey: process.env.TOSS_SECRET_KEY,
};

export async function createTossPayment(amount: number, orderId: string, orderName: string) {
    // Toss Payments API 호출 로직
    // 추후 구현 예정
    console.log('Toss Payments integration coming soon...');
}
*/

// Stripe helper functions

/**
 * Stripe 고객 생성 또는 조회
 */
export async function getOrCreateStripeCustomer(userId: string, email: string, name?: string) {
    if (!stripe) {
        throw new Error('Stripe is not initialized. Please set STRIPE_SECRET_KEY environment variable.');
    }

    // 기존 고객 조회
    const customers = await stripe.customers.list({
        email,
        limit: 1,
    });

    if (customers.data.length > 0) {
        return customers.data[0];
    }

    // 새 고객 생성
    return await stripe.customers.create({
        email,
        name,
        metadata: {
            supabase_user_id: userId,
        },
    });
}

/**
 * Checkout Session 생성
 */
export async function createCheckoutSession({
    customerId,
    priceId,
    successUrl,
    cancelUrl,
}: {
    customerId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
}) {
    if (!stripe) {
        throw new Error('Stripe is not initialized. Please set STRIPE_SECRET_KEY environment variable.');
    }

    return await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
    });
}

/**
 * 구독 취소
 */
export async function cancelSubscription(subscriptionId: string) {
    if (!stripe) {
        throw new Error('Stripe is not initialized. Please set STRIPE_SECRET_KEY environment variable.');
    }
    return await stripe.subscriptions.cancel(subscriptionId);
}

/**
 * 구독 업데이트
 */
export async function updateSubscription(subscriptionId: string, newPriceId: string) {
    if (!stripe) {
        throw new Error('Stripe is not initialized. Please set STRIPE_SECRET_KEY environment variable.');
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return await stripe.subscriptions.update(subscriptionId, {
        items: [
            {
                id: subscription.items.data[0].id,
                price: newPriceId,
            },
        ],
    });
}

/**
 * Customer Portal 세션 생성
 */
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
    if (!stripe) {
        throw new Error('Stripe is not initialized. Please set STRIPE_SECRET_KEY environment variable.');
    }
    return await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });
}
