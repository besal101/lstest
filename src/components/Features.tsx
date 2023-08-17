import React, { useMemo } from "react";

interface IProductFeaturesProps {
  shortDesc: string;
}

const removeHtmlEntities = (htmlString: string) => {
  // Remove &nbsp; and other HTML entities from the string
  return htmlString.replace(/&nbsp;|&#160;/gi, "");
};

const ProductFeatures: React.FC<IProductFeaturesProps> = ({ shortDesc }) => {
  const sanitizedShortDesc = useMemo(() => {
    // Remove span, strong, and HTML entities from the shortDesc
    const removedHtmlEntities = removeHtmlEntities(shortDesc);
    const sanitizedDesc = removedHtmlEntities.replace(
      /<span\b[^>]*>|<\/span>|<strong\b[^>]*>|<\/strong>/gi,
      ""
    );
    return sanitizedDesc;
  }, [shortDesc]);

  const liElements = useMemo(() => {
    const liArray: JSX.Element[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedShortDesc, "text/html");
    const ulElement = doc.querySelector("ul");

    if (ulElement) {
      const liNodes = ulElement.querySelectorAll("li");
      liNodes.forEach((liNode) => {
        liArray.push(<li key={liArray.length}>{liNode.innerHTML}</li>);
      });
    }

    return liArray;
  }, [sanitizedShortDesc]);

  return (
    <div className="px-4 pt-3 pb-2 text-sm md:text-base text-gray-600">
      <ul className="list-disc list-inside leading-6">{liElements}</ul>
    </div>
  );
};

export default ProductFeatures;
