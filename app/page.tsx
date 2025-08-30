import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import Image from "next/image";
const prisma = new PrismaClient();
export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div className="bg-white min-h-screen min-w-full text-black">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Users</h1>
        <ul className="list-disc ">
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <form
          action={async (formData) => {
            "use server";
            const name = formData.get("name");
            const email = formData.get("email");
            await prisma.user.create({
              data: {
                name: name as string,
                email: email as string,
              },
            });
            revalidatePath("/");
          }}
        >
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            name="name"
            required
            placeholder="Name"
          />
          <input
            className="border border-gray-300 p-2 rounded"
            type="email"
            name="email"
            required
            placeholder="Email"
          />
          <button className="bg-blue-500 text-white p-2 rounded" type="submit">
            Create User
          </button>
        </form>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
