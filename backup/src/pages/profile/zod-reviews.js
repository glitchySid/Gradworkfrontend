import {z} from 'zod';

export const ReviewSchema = z.object({
    name: z.string(),
    rating: z.number().int().min(1).max(5),
    text: z.string(),
    image: z.string().url()
});

export const ReviewsData = z.array(ReviewSchema);

export const reviews = [
    {
        name: 'Rushil Suvarna',
        rating: 5,
        text: 'I hired Franklin Clinton for a frontend development project, and the results were outstanding! The design was clean, responsive, and delivered on time. Communication was smooth throughout the process. Highly recommended for anyone looking for a skilled frontend developer 👍',
        image: 'https://example.com/rushil-suvarna.jpg'
    },
    {
        name: 'Aditya Tiwari',
        rating: 5,
        text: 'His delivery time and efficiency of work is insane. I love to work with him.',
        image: 'https://example.com/aditya-tiwari.jpg'
    },
    {
        name: 'Anshu Patil',
        rating: 4,
        text: 'This is has become my go to guy now!! He delivers Project not only on time but with great UI. So happy to work with him ❤️!',
        image: 'https://example.com/anshu-patil.jpg'
    },
    {
        name: 'Sumit Shukla',
        rating: 4,
        text: 'I hired siddesh mhatre for a frontend development project, and the results were outstanding! The design was clean, responsive, and delivered on time. Communication was smooth throughout the process. Highly recommended for anyone looking for a skilled frontend developer 👍',
        image: 'https://example.com/sumit-shukla.jpg'
    }
];
