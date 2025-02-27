const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const { expect } = require('chai');

describe('Booking Controller', () => {
  let userId;
  let roomId;
  let bookingId;

  before(async () => {
    // Connect to the database
    await mongoose.connect('mongodb://localhost:27017/hostel_management', { useNewUrlParser: true, useUnifiedTopology: true });

    // Create a user and a room for testing
    const user = await request(app).post('/users').send({ name: 'Test User', email: 'test@example.com' });
    userId = user.body._id;

    const room = await request(app).post('/rooms').send({ name: 'Test Room', capacity: 2 });
    roomId = room.body._id;
  });

  after(async () => {
    // Clean up the database
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('should book a room', async () => {
    const res = await request(app)
      .post('/book-room')
      .send({ roomId, checkInDate: '2023-10-01', checkOutDate: '2023-10-10' })
      .set('Authorization', `Bearer ${userId}`); // Assuming you use JWT for authentication

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('Room booked successfully');
    bookingId = res.body.booking._id;
  });

  it('should get user bookings', async () => {
    const res = await request(app)
      .get('/user-bookings')
      .set('Authorization', `Bearer ${userId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  it('should update booking status', async () => {
    const res = await request(app)
      .put('/update-booking')
      .send({ bookingId, status: 'Confirmed' });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('Confirmed');
  });
});
