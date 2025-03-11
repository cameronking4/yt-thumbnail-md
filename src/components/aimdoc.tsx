import Script from "next/script";

export default function AimDocWidget() {
  return (
    <>
      <Script
        src="https://app.aimdoc.ai/embedded.bundle.js"
        strategy="afterInteractive"
      />
      <Script strategy="afterInteractive" id="aimdoc-init-script">
        {`
          window.addEventListener('load', function() {
            if (window.Agent) {
              window.Agent.initAgentChat('ai-assistant', {
                agentId: '96f2207f-53b4-4094-aa4d-26577bf41c56'
              });
            }
          });
        `}
      </Script>
    </>
  );
}