"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Mic, Music, Send } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { ClipboardCopy } from 'lucide-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { formSchema } from "./constants";
const dotenv = require('dotenv').config;
dotenv();
const OPEN_API_KEY="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";
const model ="whisper-1";

const TranscriptionPage = () => {
  const proModal = useProModal();
  const inputRef = useRef<HTMLInputElement>(null);
  type AudioFile = File | null;
  const [file, setFile] = useState<AudioFile>(null);
  const router = useRouter();
  const [response, setResponse]=useState(null);
  const [isCopied, setCopied] = useState(false);

const onChangeFile =() =>{
  setFile(inputRef.current?.files?.[0] || null);
};
useEffect(() =>{
  const fetchAudioFile = async () =>{
    if(!file){
      return;
    }
    const formData = new FormData();
    formData.append('model', model);
    formData.append('file', file);

    axios 
    .post("https://api.openai.com/v1/audio/transcriptions", formData,{
      headers:{
        "Content-Type" : "multipart/form-data",
        Authorization: `Bearer ${OPEN_API_KEY}`,
      }
    }).then((res) =>
    {
      console.log(res.data);
      setResponse(res.data);
    })
  };
  fetchAudioFile();
}, [file]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  return ( 
    <div>
      <Heading
        title="Audio Transcription"
        description="Turn your audio file into Text."
        icon={Mic}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form  
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                  <Input
                    type="file"
                    ref={inputRef}
                    onChange={onChangeFile}
                    accept=".flac, .mp3, .mp4, .mpeg, .mpga, .m4a, .ogg, .wav, .webm"
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    disabled={isLoading} 
                    placeholder="Piano solo" 
                  />

                  </FormControl>
                </FormItem>
              )}
            />
           
          </form>
        </Form>
        {response && (
        <div className="mt-4">
          <CopyToClipboard text={JSON.stringify(response, null, 2)} onCopy={() => setCopied(true)}>
            <button className="flex items-center space-x-2 p-2 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none">
              <ClipboardCopy className="text-gray-600" size={16} />
              <span>Copy to Clipboard</span>
            </button>
          </CopyToClipboard>

          {response && <div className="px-2 py-4 mt-4 bg-[#ebebf6] lg:px-8">{JSON.stringify(response, null, 2)}</div>}

          {isCopied && <div className="text-green-600 mt-2">Copied to clipboard!</div>}
        </div>
      )}

  
      </div>
    </div>
   );
}
 
export default TranscriptionPage;
