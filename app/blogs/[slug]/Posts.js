"use client";
import React, { useState, useEffect } from "react";
import { CiCircleChevRight } from "react-icons/ci";
import Link from "next/link";
import ConfigData from "../../../config";
import PageNotFound from "../../[service]/page";
import Image from "next/image";

const Posts = ({ slug }) => {
  const siteUrl = ConfigData.wpApiUrl;
  const serverUrl = ConfigData.SERVER;
  const mainWebUrl = ConfigData.mainWebUrl;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${siteUrl}/blogs?_embed&slug=${slug}`);
        if (!response.ok) throw new Error("Post not found");
        const jsonData = await response.json();
        if (jsonData.length === 0) setNotFound(true);
        else setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [siteUrl, serverUrl, slug]);

  if (notFound) return <PageNotFound />;

  return (
    <>
      <style>
        {`
        h1, h2, h3, h4, h5, h6 {
          margin-bottom: 1rem !important;
        }
        h1, h2, h3, h4, h5, h6, p {
          margin-top: 1rem !important;
        }
        
        ul li {
          margin-bottom: 1rem !important;
        }

        ul {
          padding-left: 20px !important;
          margin-top: 1rem !important;
        }

        h4 {
          font-size: 24px !important;
        }

        h3 {
          font-size: 28px !important;
        }
        
        h2 {
          font-size: 28px !important;
        }

        b {
          font-weight: 700 !important;
          font-style: normal !important;
        }
      `}
      </style>

      {/* SEO is now handled by Next.js 13+ metadata API in page.jsx */}

      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-0 pt-32">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-5 w-40 bg-gray-300 rounded mb-4"></div>
            <div className="w-full h-[280px] bg-gray-300 rounded-3xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            </div>
          </div>
        ) : data ? (
          data.map((post) => (
            <div className="flex flex-col" key={post.id}>
              {/* Breadcrumb */}
              <div className="flex items-center mb-10 text-black lg:text-[16px] text-[14px]">
                <Link href="/blogs" className="hover:underline">
                  <span className="px-1">Blogs</span>
                </Link>
                <CiCircleChevRight className="text-black" />
                <span
                  className="px-1"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </div>

              {/* Banner Image */}
              <Image
                src={post.acf.desktop_banner_image.url}
                alt={post.title.rendered}
                loading="lazy"
                className="w-full h-full rounded-4xl object-cover"
                width={800}
                height={600}
              />

              {/* Content */}
              <div className="py-10 text-black lg:px-5 px-0">
                <h5
                  className="lg:text-[52px] text-xl font-semibold pb-3"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div>
                  <div className="prose prose-lg text-black max-w-none text-lg">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.rendered,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </>
  );
};

export default Posts;
