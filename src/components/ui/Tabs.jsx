import { Tab } from "@headlessui/react"
import clsx from "clsx"

export function Tabs({ tabs }) {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-2 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              clsx(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700",
                "focus:outline-none focus:ring-2 focus:ring-blue-400",
                selected
                  ? "bg-white shadow text-blue-600"
                  : "hover:bg-white/[0.12] hover:text-blue-500"
              )
            }
          >
            {tab.name}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="mt-2">
        {tabs.map((tab) => (
          <Tab.Panel
            key={tab.name}
            className="rounded-xl bg-white p-3 shadow focus:outline-none"
          >
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
