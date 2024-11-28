import React from "react";
import NextHead from "next/head";

import { siteConfig } from "@/config/site";

export const Head = () => {
  return (
    <NextHead>
      <title>{siteConfig.name}</title>
      <meta key="title" content={siteConfig.name} property="og:title" />
      <meta content={siteConfig.description} property="og:description" />
      <meta content={siteConfig.description} name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
      <meta
        name="description"
        content="ช่วยเหลือผู้ประสบภัยน้ำท่วมภาคใต้ ร่วมบริจาคได้ที่นี่"
      />
      <meta property="og:title" content="บริจาคช่วยน้ำท่วมภาคใต้" />
      <meta
        property="og:description"
        content="ช่วยเหลือผู้ประสบภัยน้ำท่วมภาคใต้ ร่วมบริจาคได้ที่นี่"
      />
      <meta
        property="og:url"
        content="https://www.น้ำท่วมภาคใต้67.com/donate"
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="บริจาคช่วยน้ำท่วมภาคใต้" />
      <meta
        name="twitter:description"
        content="ช่วยเหลือผู้ประสบภัยน้ำท่วมภาคใต้ ร่วมบริจาคได้ที่นี่"
      />
      <meta
        name="twitter:image"
        content="https://www.xn--67-uqi9dil4ch7c7fe9r7blk7c.com/donation.jpg"
      />
      <link rel="canonical" href="https://www.น้ำท่วมภาคใต้67.com" />
    </NextHead>
  );
};
