import { Header } from "../../widgets";
import { Pool } from "../../modules";

export default () => (
  <>
    <Header />
    <div className="p-12">
      <Pool />
    </div>
    <div id="portal" />
  </>
);
