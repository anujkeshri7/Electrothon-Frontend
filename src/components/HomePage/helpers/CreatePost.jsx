
import { useState, useRef } from "react";
import { Image, Send, X, Plus, Tag, Type } from "lucide-react";
import { CURRENT_USER } from "./constants";
import axios from "axios";

const MAX_IMAGES = 10;
const MAX_CHARS = 500;

// ─── Image preview grid ───────────────────────────────────────────────────────
function ImagePreviewGrid({ images, onRemove }) {
  const count = images.length;
  if (!count) return null;

  if (count === 1) {
    return (
      <div className="mt-3 rounded-xl overflow-hidden relative group" style={{ height: 180 }}>
        <img
          src={images[0].preview}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <button
          onClick={() => onRemove(0)}
          className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center border border-white/20"
          style={{ background: "rgba(0,0,0,0.65)" }}
        >
          <X size={10} color="#fff" />
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {images.map((img, i) => {
        const isOverflow = i === 3 && count > 4;
        if (i > 3) return null;

        return (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden group flex-shrink-0"
            style={{ width: 80, height: 80 }}
          >
            <img
              src={img.preview}
              alt=""
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.06]"
            />

            {isOverflow && (
              <div
                className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[2px]"
                style={{ background: "rgba(7,7,17,0.68)" }}
              >
                <span className="text-white text-base font-bold">
                  +{count - 3}
                </span>
              </div>
            )}

            {!isOverflow && (
              <button
                onClick={() => onRemove(i)}
                className="absolute top-1 right-1 z-20 w-5 h-5 rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100"
                style={{ background: "rgba(0,0,0,0.7)" }}
              >
                <X size={9} color="#fff" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Tag input ────────────────────────────────────────────────────────────────
function TagInput({ tags, setTags }) {
  const [input, setInput] = useState("");

  const addTag = (raw) => {
    const val = raw.trim().replace(/^#+/, "");
    if (!val || tags.includes("#" + val) || tags.length >= 8) return;
    setTags((t) => [...t, "#" + val]);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (["Enter", ",", " "].includes(e.key)) {
      e.preventDefault();
      addTag(input);
    }
  };

  return (
    <div
      className="flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-xl mt-2.5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)"
      }}
    >
      <Tag size={13} color="rgba(255,255,255,0.22)" />

      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px]"
          style={{
            background: "rgba(99,102,241,0.14)",
            border: "1px solid rgba(99,102,241,0.28)",
            color: "#a5b4fc"
          }}
        >
          {tag}
          <button
            onClick={() => setTags((t) => t.filter((x) => x !== tag))}
            className="bg-transparent border-none cursor-pointer"
          >
            <X size={10} />
          </button>
        </span>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Add tags..."
        className="flex-1 min-w-[80px] bg-transparent border-none outline-none text-xs"
        style={{ color: "rgba(255,255,255,0.7)" }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreatePost() {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [toast, setToast] = useState(false);

  const fileRef = useRef(null);
  const canPost = content.trim() || images.length > 0;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(false), 2500);
  };

  const reset = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setImages([]);
    setActive(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const added = files.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      name: f.name,
      size: f.size
    }));

    setImages((p) => [...p, ...added]);
    e.target.value = "";
  };

  const removeImage = (i) => {
    setImages((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[i].preview);
      next.splice(i, 1);
      return next;
    });
  };

  // ─── UPDATED POST HANDLER (FormData + Dummy API) ───────────────────────────
  const handlePost = async () => {
    if (!canPost) return;

    const formData = new FormData();

    formData.append("title", title.trim());
    formData.append("content", content.trim());

    tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });

    images.forEach((img) => {
      formData.append("images[]", img.file);
    });

   

    try {
      
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/post/add`, formData, {
        withCredentials: true,
      })

      if(res.data.success){
        console.log("✅ Post uploaded");
        showToast("Posted successfully!");
        setTimeout(reset, 500);
      }else{
        console.error("❌ Upload failed", res.data.message);
        showToast("Post failed");
      }

    } catch (err) {
      console.error("❌ Upload failed", err);
      showToast("Post failed ❌");
    }
  };

  return (
    <>
      <div
        className="rounded-2xl p-[18px] backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.026)",
          border: "1px solid rgba(255,255,255,0.075)"
        }}
      >
        {/* TOP ROW */}
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
            style={{
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)"
            }}
          >
            {CURRENT_USER?.initials ?? "U"}
          </div>

          <div
            onClick={() => setActive(true)}
            className="flex-1 rounded-[14px] cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: active ? "10px 14px 8px" : "11px 16px"
            }}
          >
            {!active ? (
              <span style={{ color: "rgba(255,255,255,0.2)" }}>
                What's on your mind?
              </span>
            ) : (
              <>
                <input
                  placeholder="Post title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[15px] font-semibold pb-2 mb-2"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    color: "white"
                  }}
                />

                <textarea
                  rows={3}
                  placeholder="Share something with your campus…"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent border-none outline-none resize-none text-[13px]"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                />
              </>
            )}
          </div>
        </div>

        {images.length > 0 && (
          <ImagePreviewGrid images={images} onRemove={removeImage} />
        )}

        {active && (
          <>
            <TagInput tags={tags} setTags={setTags} />

            <div className="flex items-center gap-2 mt-3">
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileRef}
                className="hidden"
                onChange={handleImageChange}
              />

              <button onClick={() => fileRef.current.click()}>
                <Image size={18} color="#818cf8" />
              </button>

              <button
                onClick={handlePost}
                disabled={!canPost}
                className="ml-auto flex items-center gap-1 px-4 py-1.5 rounded-[10px] text-xs font-semibold"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color: "#fff"
                }}
              >
                <Send size={13} />
                Post
              </button>
            </div>
          </>
        )}
      </div>

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl"
          style={{
            background: "rgba(14,14,26,0.95)",
            border: "1px solid rgba(99,102,241,0.38)",
            color: "#a5b4fc"
          }}
        >
          {toast}
        </div>
      )}
    </>
  );
}
