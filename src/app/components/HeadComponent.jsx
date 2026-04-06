import Head from "next/head";

const HeadComponent = (props) => {
  return (
    <Head>
      
      <meta property="og:title" content={props.titleMetaName}/>
      <title>{props.titleMetaName}</title>
      <meta name="description" content={props.metaDescription}/>
    </Head>
  );
};

export default HeadComponent;
