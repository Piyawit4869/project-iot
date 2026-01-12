import { TabControl } from "~/components/shared/tab-control";
import { Button } from "~/components/ui/button";

export default function HomeComponent() {
  const ESP_BASE = "http://192.168.43.3:80";

  type Command = "unlock";

  const sendCommand = async (cmd: Command) => {
    try {
      const res = await fetch(`${ESP_BASE}/${cmd}`, {
        method: "GET",
      });

      const text = await res.text();
      console.log("ESP response:", text);
    } catch (err) {
      console.error("Failed to send command:", err);
    }
  };

  return (
    <div className="container h-[calc(100vh-58px)] mx-auto">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Content */}
        <div className="flex-1 p-6 bg-gradient-to-br">
          {/* Welcome Section */}
          <TabControl
            title="Human Detection System"
            buttons={[
              <Button
                key="create-button"
                className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                onClick={() => sendCommand("unlock")}
              >
                <span className="hidden sm:inline">ปลดล็อคประตู</span>
              </Button>,
            ]}
          />

          <div className="rounded-xl shadow-sm border p-6 dark:bg-card">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Live Stream
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
