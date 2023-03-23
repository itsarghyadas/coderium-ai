import { useState } from "react";
import { Switch } from "@headlessui/react";

function MyToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-green-500" : "bg-gray-400"
      } relative inline-flex h-4 w-[35px] items-center rounded-full border border-slate-200/70 outline-none`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-5 bg-white" : "translate-x-[1px] bg-white"
        } pointer-events-none inline-block h-3 w-3 transform rounded-full transition`}
      />
    </Switch>
  );
}

export default MyToggle;
