import { test, expect } from '@playwright/test';

test.describe.serial('API-тесты для Restful-booker', { tag: '@api' }, () => {
    const baseURL = 'https://restful-booker.herokuapp.com';

    let bookingId: number;
    let token: string;

    const bookingData = {
        firstname: 'dan',
        lastname: 'Hrit',
        totalprice: 999,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-05-05',
            checkout: '2026-06-10',
        },
        additionalneeds: 'Breakfast',
    };

    const updatedBookingData = {
        firstname: 'den',
        lastname: 'Kirt',
        totalprice: 118,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-05-05',
            checkout: '2026-06-12',
        },
        additionalneeds: 'Lunch',
    };

    test('Создание бронирования', async ({ request }) => {
        const response = await request.post(`${baseURL}/booking`, {
            data: bookingData,
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('bookingid');
        bookingId = body.bookingid;
        expect(body.booking).toEqual(bookingData);
    });

    test('Получение информации о бронировании', async ({ request }) => {
        const response = await request.get(`${baseURL}/booking/${bookingId}`, {
            headers: {
                Accept: 'application/json',
            },
        });

        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual(bookingData);
    });

    test('Обновление бронирования', async ({ request }) => {
        const authResponse = await request.post(`${baseURL}/auth`, {
            data: {
                username: 'admin',
                password: 'password123',
            },
        });

        expect(authResponse.status()).toBe(200);
        const authBody = await authResponse.json();
        token = authBody.token;

        const response = await request.put(`${baseURL}/booking/${bookingId}`, {
            headers: {
                Accept: 'application/json',
                Cookie: `token=${token}`,
            },
            data: updatedBookingData,
        });

        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual(updatedBookingData);
    });

    test('Удаление бронирования', async ({ request }) => {
        const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`,
            },
        });

        expect(response.status()).toBe(201);

        const getResponse = await request.get(`${baseURL}/booking/${bookingId}`, {
            headers: {
                Accept: 'application/json',
            },
        });

        expect(getResponse.status()).toBe(404);
    });
});