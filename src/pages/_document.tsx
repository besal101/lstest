import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";
import { getDirection } from "@utils/getDirection";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale };
  }

  componentDidMount() {
    const { locale } = this.props.__NEXT_DATA__;
    if (process.env.NODE_ENV !== "production" && i18n) {
      i18n.reloadResources(locale);
    }
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;
    return (
      <Html dir={getDirection(locale)}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            href="https://cdn.lifesmile.ae/websiteBanner/favicon_32x32_clmmvk.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            href="https://cdn.lifesmile.ae/websiteBanner/favicon_48x48_khoedm.png"
            sizes="48x48"
          />
          <link
            rel="icon"
            href="https://cdn.lifesmile.ae/websiteBanner/favicon_96x96_wohdnq.png"
            sizes="96x96"
          />
          <link
            rel="icon"
            href="https://cdn.lifesmile.ae/websiteBanner/favicon_144x144_jwehzg.png"
            sizes="144x144"
          />
        </Head>
        <body className="relative">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
