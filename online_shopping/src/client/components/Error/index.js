export default function ErrorPage() {
    throw new Error("This is a test error");
    return <div>This component will not render</div>;
  }