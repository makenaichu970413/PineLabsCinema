// ####################################
// React && Plugins
// ####################################
import Head from "next/head";
// ####################################

function MetaHead(props) {
  const { data } = props;

  return (
    <Head>
      {/*  Primary Meta Tags */}
      <title>{data["title"]}</title>
      <meta name="description" content={data["description"]} />

      {/* Open Graph / Facebook */}
      <meta property="og:url" content={data["ogURL"]} key="ogurl" />
      <meta property="og:title" content={data["ogTitle"]} key="ogtitle" />
      <meta
        property="og:description"
        content={data["description"]}
        key="ogdesc"
      />

      <meta
        property="og:image"
        content={data["ogImage"]["src"]}
        key="ogimage"
        itemProp="image"
      />
      <meta property="og:image:width" content={data["ogImage"]["width"]} />
      <meta property="og:image:height" content={data["ogImage"]["height"]} />
    </Head>
  );
}

export default MetaHead;
