import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useStudentHub } from "../context/StudentHubContext";

const NotesResourcesPage = () => {
  const { notes, resources, addNote, addResource } = useStudentHub();
  const [noteForm, setNoteForm] = useState({ title: "", content: "", tag: "study" });
  const [resourceForm, setResourceForm] = useState({ title: "", link: "", tag: "planning" });

  const groupedResources = useMemo(() => {
    return resources.reduce((acc, item) => {
      acc[item.tag] = acc[item.tag] || [];
      acc[item.tag].push(item);
      return acc;
    }, {});
  }, [resources]);

  const submitNote = (event) => {
    event.preventDefault();

    if (!noteForm.title || !noteForm.content) {
      return;
    }

    addNote(noteForm);
    setNoteForm({ title: "", content: "", tag: "study" });
  };

  const submitResource = (event) => {
    event.preventDefault();

    if (!resourceForm.title || !resourceForm.link) {
      return;
    }

    addResource(resourceForm);
    setResourceForm({ title: "", link: "", tag: "planning" });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Write</p>
          <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Notes</h2>
          <form onSubmit={submitNote} className="mt-4 space-y-3">
            <input
              className="input"
              placeholder="Title"
              value={noteForm.title}
              onChange={(event) => setNoteForm((prev) => ({ ...prev, title: event.target.value }))}
            />
            <select
              className="input"
              value={noteForm.tag}
              onChange={(event) => setNoteForm((prev) => ({ ...prev, tag: event.target.value }))}
            >
              {"study resources planning wellness".split(" ").map((tag) => (
                <option key={tag}>{tag}</option>
              ))}
            </select>
            <textarea
              className="input min-h-36"
              placeholder="Write a quick reflection or checklist"
              value={noteForm.content}
              onChange={(event) => setNoteForm((prev) => ({ ...prev, content: event.target.value }))}
            />
            <button type="submit" className="btn-primary w-full">
              Save note
            </button>
          </form>
        </div>

        <div className="panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Saved notes</p>
          <div className="mt-4 space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="rounded-2xl border border-[#dbe2d5] bg-white/90 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[#1f241d]">{note.title}</p>
                  <span className="chip chip-sage">{note.tag}</span>
                </div>
                <p className="mt-2 text-sm text-[#51614f]">{note.content}</p>
                <p className="mt-2 text-xs text-[#6d7b66]">Updated {note.updatedAt}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="space-y-6">
        <div className="panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Collect</p>
          <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Resources</h2>
          <form onSubmit={submitResource} className="mt-4 space-y-3">
            <input
              className="input"
              placeholder="Resource name"
              value={resourceForm.title}
              onChange={(event) => setResourceForm((prev) => ({ ...prev, title: event.target.value }))}
            />
            <input
              className="input"
              placeholder="URL"
              value={resourceForm.link}
              onChange={(event) => setResourceForm((prev) => ({ ...prev, link: event.target.value }))}
            />
            <select
              className="input"
              value={resourceForm.tag}
              onChange={(event) => setResourceForm((prev) => ({ ...prev, tag: event.target.value }))}
            >
              {"planning design learning motivation".split(" ").map((tag) => (
                <option key={tag}>{tag}</option>
              ))}
            </select>
            <button type="submit" className="btn-primary w-full">
              Save resource
            </button>
          </form>
        </div>

        <div className="panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Library</p>
          <div className="mt-4 space-y-3">
            {Object.entries(groupedResources).map(([tag, items]) => (
              <div key={tag}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#51614f]">{tag}</p>
                <div className="mt-2 space-y-2">
                  {items.map((item) => (
                    <a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-[#dbe2d5] bg-white/90 px-4 py-3"
                    >
                      <p className="font-semibold text-[#1f241d]">{item.title}</p>
                      <p className="text-sm text-[#51614f] break-all">{item.link}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default NotesResourcesPage;
