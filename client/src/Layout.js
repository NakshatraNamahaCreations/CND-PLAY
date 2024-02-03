
import Header from "./Header";

export default function Layout( {Children}) {
  return <>
    <Header/>
    {Children}
    </>;
}
