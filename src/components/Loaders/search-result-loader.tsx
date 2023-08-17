import ContentLoader from "react-content-loader";

const SearchResultLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={400}
    height={26}
    viewBox="0 0 400 26"
    backgroundColor="#F3F6FA"
    foregroundColor="#E7ECF3"
    className="w-full h-auto rounded-md overflow-hidden"
    {...props}
  >
    <rect x="10" y="12" rx="6" ry="1" width="200" height="8" />
  </ContentLoader>
);

export default SearchResultLoader;
