'use server'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
export default async function Home() {

  return (
    <>
      <DefaultLayout classN>
        <span className="loading loading-spinner text-primary w-48 h-48 text-center"></span>
      </DefaultLayout>
    </>
  );
}
