import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8 lg:p-12 prose">
      <h1>api.yhakamay.me</h1>
      <p>
        This is a simple API that I use to test and experiment with different
        technologies and techniques. It&apos;s a work in progress and I&apos;m
        always adding new features and endpoints. If you have any suggestions or
        feedback, feel free to reach out to me on{" "}
        <a
          href="https://twitter.com/yhakamay"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        .
      </p>
      <h2>Catalog</h2>
      <ul>
        <li>
          <Link href="/top-repos">Top repos</Link>
          <div className="badge badge-outline badge-success ml-2 my-0">New</div>
        </li>
        <li>
          Zenn articles
          <div className="badge ml-2 my-0">Coming Soon</div>
        </li>
        <li>
          My availability
          <div className="badge ml-2 my-0">Coming Soon</div>
        </li>
        <li>
          My wheather
          <div className="badge ml-2 my-0">Coming Soon</div>
        </li>
        <li>
          My clips
          <div className="badge ml-2 my-0">Coming Soon</div>
        </li>
      </ul>
    </main>
  );
}
