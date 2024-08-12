"use client";

import { useWalletClient } from "@thalalabs/surf/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ABI } from "@/utils/abi";

import { aptosClient } from "@/utils/aptosClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormSchema = z.object({
  booleanContent: z.boolean(),
  stringContent: z.string(),
  numberContent: z.number().int(),
  addressContent: z.string().startsWith("0x"),
  objectContent: z.string().startsWith("0x"),
  vectorContent: z.array(z.string()),
  optionalBooleanContent: z.boolean().optional(),
  optionalStringContent: z.string().optional(),
  optionalNumberContent: z.number().int().optional(),
  optionalAddressContent: z.string().startsWith("0x").optional(),
  optionalObjectContent: z.string().startsWith("0x").optional(),
  optionalVectorContent: z.array(z.string()).optional(),
});

export function PostMessageWithSurf() {
  const { toast } = useToast();
  const { account } = useWallet();
  const { client: walletClient } = useWalletClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      booleanContent: true,
      stringContent: "hello world",
      numberContent: 1,
      addressContent: "0x1",
      objectContent: "0x577f6d824628353ce99463e2b85e76160db72c3445215ccb1ecbbe332dc631e8",
      vectorContent: ["hello", "world"],
      optionalBooleanContent: undefined,
      optionalStringContent: undefined,
      optionalNumberContent: undefined,
      optionalAddressContent: undefined,
      optionalObjectContent: undefined,
      optionalVectorContent: undefined,
    },
  });

  const onSignAndSubmitTransaction = async (data: z.infer<typeof FormSchema>) => {
    if (!account || !walletClient) {
      console.error("Account or wallet client not available");
      return;
    }

    try {
      const committedTransaction = await walletClient?.useABI(ABI).post_message({
        type_arguments: [],
        arguments: [
          data.booleanContent,
          data.stringContent,
          data.numberContent,
          data.addressContent as `0x${string}`,
          data.objectContent as `0x${string}`,
          data.vectorContent,
          data.optionalBooleanContent,
          data.optionalStringContent,
          data.optionalNumberContent,
          data.optionalAddressContent as `0x${string}`,
          data.optionalObjectContent as `0x${string}`,
          data.optionalVectorContent,
        ],
      });
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      toast({
        title: "Success",
        description: `Transaction succeeded, hash: ${executedTransaction.hash}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <p>Post a message</p>
      <form
        onSubmit={form.handleSubmit(onSignAndSubmitTransaction)}
        className="grid justify-between gap-4 grid-cols-2 w-full"
      >
        <FormField
          control={form.control}
          name="booleanContent"
          render={({ field }) => (
            <RadioGroup
              value={String(field.value)}
              onValueChange={(value) => {
                if (value === "true") {
                  field.onChange(true);
                } else {
                  field.onChange(false);
                }
              }}
              className="flex flex-col space-y-1"
            >
              <FormLabel>Boolean Content</FormLabel>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel className="font-normal">True</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel className="font-normal">False</FormLabel>
              </FormItem>
              <FormDescription>Store a boolean content</FormDescription>
            </RadioGroup>
          )}
        />
        <FormField
          control={form.control}
          name="stringContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>String Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Store a string content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number Content</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(event) => {
                    field.onChange(parseInt(event.target.value));
                  }}
                />
              </FormControl>
              <FormDescription>Store a number content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Store an address content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="objectContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Object Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Store an object content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vectorContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vector Content</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value.split(","));
                  }}
                />
              </FormControl>
              <FormDescription>Store a vector content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionalBooleanContent"
          render={({ field }) => (
            <RadioGroup
              value={String(field.value)}
              onValueChange={(value) => {
                if (value === "true") {
                  field.onChange(true);
                } else if (value === "false") {
                  field.onChange(false);
                } else {
                  field.onChange(undefined);
                }
              }}
              className="flex flex-col space-y-1"
            >
              <FormLabel>Optional Boolean Content</FormLabel>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="undefined" />
                </FormControl>
                <FormLabel className="font-normal">Null</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel className="font-normal">True</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel className="font-normal">False</FormLabel>
              </FormItem>
              <FormDescription>Store an optional boolean content</FormDescription>
            </RadioGroup>
          )}
        />
        <FormField
          control={form.control}
          name="optionalStringContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Optional String Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Store an optional string content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionalNumberContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Optional Number Content</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(event) => {
                    if (event.target.value === "") {
                      field.onChange(undefined);
                    } else {
                      field.onChange(parseInt(event.target.value));
                    }
                  }}
                />
              </FormControl>
              <FormDescription>Store an optional number content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionalAddressContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Optional Address Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Store an optional address content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionalObjectContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Optional Object Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Store an optional object content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionalVectorContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Optional Vector Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Store an optional vector content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-40 gap-8">
          Post
        </Button>
      </form>
    </Form>
  );
}
