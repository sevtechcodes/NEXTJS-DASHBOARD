'use server'; 
//Server Action
 
import { z } from 'zod'; //Zod, a TypeScript-first validation library to validate types
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; //to clear this cache and trigger a new request to the server
import { redirect } from 'next/navigation'; //o redirect the user back to the /dashboard/invoices page. 

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
	const amountInCents = amount * 100; //It's usually good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy.
	const date = new Date().toISOString().split('T')[0]; //creates a new date with the format "YYYY-MM-DD" for the invoice's creation date
	await sql`
	INSERT INTO invoices (customer_id, amount, status, date)
	VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;
revalidatePath('/dashboard/invoices'); //Once the database has been updated, the /dashboard/invoices path will be revalidated, and fresh data will be fetched from the server.
redirect('/dashboard/invoices'); //
}