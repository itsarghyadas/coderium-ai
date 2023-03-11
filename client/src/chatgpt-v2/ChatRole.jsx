import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useEffect } from "react";

const plans = [
  {
    role: "Assistant 🤖",
    work: "It acts as an assistant.",
  },
  {
    role: "Doctor 🥼",
    work: "It acts as a doctor.",
  },
  {
    role: "Lawyer 📕",
    work: "It acts as a lawyer.",
  },
];

export default function Example({ onRoleSelected }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) {
      setSelected(plans[0]);
      onRoleSelected(plans[0].role);
    }
  }, []);

  const handleRoleSelection = (selectedPlan) => {
    setSelected(selectedPlan);
    console.log("clicked: ", selectedPlan.role);
    onRoleSelected(selectedPlan.role);
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={handleRoleSelection}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.role}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-0 ring-white/50 ring-opacity-60 ring-offset-1 ring-offset-sky-300/70"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-sky-900 bg-opacity-75 text-white"
                      : "bg-gray-600/10"
                  }
                    relative flex cursor-pointer rounded-lg px-3 py-2 shadow focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between text-left">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`mb-0.5 text-base font-medium  ${
                              checked ? "text-white" : "text-gray-300"
                            }`}
                          >
                            {plan.role}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-200/50"
                            }`}
                          >
                            <span>{plan.work}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
