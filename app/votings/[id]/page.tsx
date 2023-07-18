"use client";

import FormField from "@/app/ui/FormField";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Page() {
  const shareUrlInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    shareUrlInput.current?.select();
  }, []);

  return (
    <div>
      <FormField htmlFor="url" label="Send this link to your players:">
        <input
          type="url"
          name="url"
          id="url"
          readOnly
          value={window.location.href}
          ref={shareUrlInput}
        />
      </FormField>

      <h3 className="text-lg mt-4">Results</h3>

      <Link href="/">
        <div className="mt-4 text-gray-500">(back)</div>
      </Link>
    </div>
  );
}
