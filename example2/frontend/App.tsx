import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { PostMessageWithSurf } from "@/components/PostMessageWithSurf";
import { Message } from "@/components/Message";
import { surfClient } from "@/utils/aptosClient";

function App() {
  const { connected } = useWallet();
  const [messageExist, setMessageExist] = useState<boolean>(false);

  useEffect(() => {
    if (!connected) {
      return;
    }
    surfClient()
      .view.exist_message({
        typeArguments: [],
        functionArguments: [],
      })
      .then((result) => {
        console.log("message exists", result);
        setMessageExist(result[0]);
      });
  }, [connected]);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center flex-col">
        {connected ? (
          <Card>
            <CardContent className="flex flex-col gap-10 pt-6">
              {messageExist ? <Message /> : <p>Message not exists</p>}
              <PostMessageWithSurf />
            </CardContent>
          </Card>
        ) : (
          <CardHeader>
            <CardTitle>To get started Connect a wallet</CardTitle>
          </CardHeader>
        )}
      </div>
    </>
  );
}

export default App;
