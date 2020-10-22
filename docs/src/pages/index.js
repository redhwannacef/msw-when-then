import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import Test from "./test.md";

const features = [
  {
    title: "Clearer Tests",
    imageUrl: "img/undraw_task.svg",
    description: (
      <>
        Msw-when-then provides a "when-then" style api that makes your tests
        more succinct and readable.
      </>
    ),
  },
  {
    title: "Non-Invasive",
    imageUrl: "img/undraw_good_team.svg",
    description: (
      <>
        Configure MSW as normal, msw-when-then will fit in without any change to
        your existing set up. Easy to add, easy to remove.
      </>
    ),
  },
  {
    title: "Additional Features",
    imageUrl: "img/undraw_shared_goals.svg",
    description: (
      <>
        Msw-when-then provides a few additional useful features on top of MSW,
        such as mock chaining and data-assertions.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={siteConfig.title}
      description="A succinct 'when-then' style api for MSW"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title color-white">{siteConfig.title}</h1>
          <p className="hero__subtitle color-white">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg color-white"
              )}
              to={useBaseUrl("docs/getting-started/install")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
