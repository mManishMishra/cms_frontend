import MainLayout from "../layouts/MainLayout";
export const metadata = {
  title: "404 Page	",
  description:
    "404 Page	",
};
const FourZeroFour = () => {
  return (
    <div>
        <head>
        <title>
        404 Page
        </title>
        <meta
          name="description"
          content="404 Page"
        />
        <link rel="canonical" href="https://hcinterior.in/404" />	
      </head>
      <MainLayout>
        <main>
         <section>
       <a href="/">
       <img src="/images/four.png" className="w-100 object-fit-cover" height={500} alt="404" />
       </a>
         </section>
          <hr className="mt-5" />
        </main>
      </MainLayout>
    </div>
  );
};

export default FourZeroFour;
