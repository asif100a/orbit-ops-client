"use client";

import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Ellipsis,
  Filter,
  Flag,
  GripVertical,
  ListTodo,
  MessageSquare,
  Paperclip,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type TaskStatus = "todo" | "pending" | "completed";
type TaskPriority = "low" | "medium" | "high" | "urgent";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  labels: string[];
  comments?: number;
  attachments?: number;
  project?: string;
}

const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Complete authentication flow",
    description:
      "Implement JWT authentication, protected routes and session handling.",
    status: "todo",
    priority: "high",
    dueDate: "Sep 8",
    labels: ["Backend", "Auth"],
    comments: 3,
    attachments: 2,
    project: "Orbit Ops",
  },
  {
    id: "task-2",
    title: "Design dashboard analytics",
    description: "Create the analytics cards and activity chart.",
    status: "todo",
    priority: "medium",
    dueDate: "Sep 10",
    labels: ["Design"],
    comments: 1,
    project: "Orbit Ops",
  },
  {
    id: "task-3",
    title: "Fix responsive navigation",
    description: "Improve sidebar and mobile navigation behavior.",
    status: "todo",
    priority: "urgent",
    dueDate: "Sep 7",
    labels: ["Frontend", "Bug"],
    comments: 5,
    project: "Orbit Ops",
  },
  {
    id: "task-4",
    title: "Create project settings page",
    description: "Add project members, permissions and general settings.",
    status: "pending",
    priority: "medium",
    dueDate: "Sep 9",
    labels: ["Frontend"],
    comments: 2,
    project: "Orbit Ops",
  },
  {
    id: "task-5",
    title: "Setup database indexes",
    description: "Optimize frequently queried collections.",
    status: "pending",
    priority: "high",
    dueDate: "Sep 6",
    labels: ["Database"],
    attachments: 1,
    project: "Orbit Ops",
  },
  {
    id: "task-6",
    title: "Prepare deployment configuration",
    description: "Configure production environment variables.",
    status: "completed",
    priority: "high",
    dueDate: "Sep 4",
    labels: ["DevOps"],
    comments: 2,
    project: "Orbit Ops",
  },
  {
    id: "task-7",
    title: "Create initial UI components",
    description: "Build buttons, inputs, modals and cards.",
    status: "completed",
    priority: "medium",
    dueDate: "Sep 3",
    labels: ["UI"],
    project: "Orbit Ops",
  },
];

const COLUMNS: {
  id: TaskStatus;
  title: string;
  description: string;
}[] = [
  {
    id: "todo",
    title: "To Do",
    description: "Tasks waiting to be started",
  },
  {
    id: "pending",
    title: "Pending",
    description: "Tasks currently in progress",
  },
  {
    id: "completed",
    title: "Completed",
    description: "Finished tasks",
  },
];

const priorityConfig: Record<
  TaskPriority,
  {
    label: string;
    className: string;
  }
> = {
  low: {
    label: "Low",
    className: "border border-white/[0.08] bg-white/[0.05] text-[#8B89A8]",
  },
  medium: {
    label: "Medium",
    className: "border border-violet-400/15 bg-violet-400/10 text-violet-300",
  },
  high: {
    label: "High",
    className: "border border-amber-400/15 bg-amber-400/10 text-amber-300",
  },
  urgent: {
    label: "Urgent",
    className: "border border-red-400/15 bg-red-400/10 text-red-300",
  },
};

const columnConfig: Record<
  TaskStatus,
  {
    icon: React.ReactNode;
    color: string;
  }
> = {
  todo: {
    icon: <Circle className="size-4" />,
    color: "text-[#686681]",
  },
  pending: {
    icon: <Clock3 className="size-4" />,
    color: "text-violet-400",
  },
  completed: {
    icon: <CheckCircle2 className="size-4" />,
    color: "text-teal-400",
  },
};

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<
    TaskPriority | "all"
  >("all");
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, search, priorityFilter]);

  const stats = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "todo").length,
    pending: tasks.filter((task) => task.status === "pending").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((item) => item.id === event.active.id);

    if (task) {
      setActiveTask(task);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const taskId = String(active.id);
    const targetStatus = String(over.id) as TaskStatus;

    if (!["todo", "pending", "completed"].includes(targetStatus)) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: targetStatus,
            }
          : task,
      ),
    );
  }

  function handleCreateTask(task: Omit<Task, "id">) {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
    };

    setTasks((current) => [...current, newTask]);
    setIsCreateOpen(false);
  }

  function handleDeleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <div className="min-h-full bg-transparent text-white">
      <div className="mx-auto max-w-[1600px] space-y-6 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="size-4 text-violet-400" />
              Personal workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              My Tasks
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Organize your work and keep track of your progress.
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-[0_0_24px_rgba(108,99,255,0.2)] transition hover:bg-violet-500"
          >
            <Plus className="size-4" />
            Create Task
          </button>
        </header>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Total Tasks"
            value={stats.total}
            icon={<ListTodo className="size-5 text-violet-400" />}
          />

          <StatCard
            label="To Do"
            value={stats.todo}
            icon={<Circle className="size-5 text-[#686681]" />}
          />

          <StatCard
            label="Pending"
            value={stats.pending}
            icon={<Clock3 className="size-5 text-amber-300" />}
          />

          <StatCard
            label="Completed"
            value={stats.completed}
            icon={<CheckCircle2 className="size-5 text-teal-400" />}
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 shadow-sm lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#686681]" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tasks..."
              className="h-10 w-full rounded-xl border border-white/[0.07] bg-[#0d0f1e] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#55536B] focus:border-violet-500/50"
            />
          </div>

          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#686681]" />

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(
                  event.target.value as TaskPriority | "all",
                )
              }
              className="h-10 w-full appearance-none rounded-xl border border-white/[0.07] bg-[#0d0f1e] pl-10 pr-9 text-sm text-white outline-none lg:w-44"
            >
              <option value="all">All priorities</option>
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Kanban */}
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid min-h-[600px] grid-cols-1 gap-4 lg:grid-cols-3">
            {COLUMNS.map((column) => {
              const columnTasks = filteredTasks.filter(
                (task) => task.status === column.id,
              );

              return (
                <TaskColumn
                  key={column.id}
                  column={column}
                  tasks={columnTasks}
                  onDelete={handleDeleteTask}
                  onCreate={() => setIsCreateOpen(true)}
                />
              );
            })}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="w-[320px] rotate-2">
                <TaskCard task={activeTask} isOverlay />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Create modal */}
      {isCreateOpen && (
        <CreateTaskDialog
          onClose={() => setIsCreateOpen(false)}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STAT CARD                                                                  */
/* -------------------------------------------------------------------------- */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-[#8B89A8]">{label}</span>

        <div className="rounded-lg bg-white/[0.06] p-2">{icon}</div>
      </div>

      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TASK COLUMN                                                                */
/* -------------------------------------------------------------------------- */

function TaskColumn({
  column,
  tasks,
  onDelete,
  onCreate,
}: {
  column: (typeof COLUMNS)[number];
  tasks: Task[];
  onDelete: (id: string) => void;
  onCreate: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <section
      ref={setNodeRef}
      className={`flex min-h-[580px] flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 transition ${
        isOver ? "border-violet-400/50 bg-violet-400/[0.06]" : ""
      }`}
    >
      {/* Column header */}
      <div className="mb-3 flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <span className={columnConfig[column.id].color}>
            {columnConfig[column.id].icon}
          </span>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold">{column.title}</h2>

              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs text-[#8B89A8]">
                {tasks.length}
              </span>
            </div>

            <p className="hidden text-xs text-[#686681] sm:block">
              {column.description}
            </p>
          </div>
        </div>

        <button
          onClick={onCreate}
          className="rounded-lg p-2 text-[#686681] transition hover:bg-white/[0.06] hover:text-white"
        >
          <Plus className="size-4" />
        </button>
      </div>

      {/* Cards */}
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-1 flex-col gap-3">
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              onDelete={onDelete}
            />
          ))}

          {tasks.length === 0 && (
              <div className="flex min-h-[160px] flex-1 items-center justify-center rounded-xl border border-dashed border-white/[0.08]">
              <div className="text-center">
                <div className="mx-auto mb-2 flex size-9 items-center justify-center rounded-full bg-muted">
                  <Plus className="size-4 text-[#686681]" />
                </div>

                <p className="text-xs text-[#686681]">
                  Drop tasks here
                </p>
              </div>
            </div>
          )}
        </div>
      </SortableContext>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SORTABLE TASK                                                               */
/* -------------------------------------------------------------------------- */

function SortableTask({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={isDragging ? "opacity-40" : ""}
    >
      <TaskCard
        task={task}
        dragHandleProps={listeners}
        onDelete={() => onDelete(task.id)}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TASK CARD                                                                  */
/* -------------------------------------------------------------------------- */

function TaskCard({
  task,
  isOverlay = false,
  dragHandleProps,
  onDelete,
}: {
  task: Task;
  isOverlay?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
  onDelete?: () => void;
}) {
  const priority = priorityConfig[task.priority];

  return (
    <article
      className={`group rounded-xl border border-white/[0.07] bg-[#0d0f1e] p-4 shadow-sm transition ${
        isOverlay
          ? "shadow-xl"
          : "hover:border-violet-400/30 hover:shadow-md"
      }`}
    >
      {/* Top */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium ${priority.className}`}
        >
          <Flag className="size-3" />
          {priority.label}
        </span>

        <div className="flex items-center">
          <button
            {...dragHandleProps}
            className="cursor-grab rounded-md p-1.5 text-[#686681] opacity-0 transition hover:bg-white/[0.06] group-hover:opacity-100 active:cursor-grabbing"
          >
            <GripVertical className="size-4" />
          </button>

          <button className="rounded-md p-1.5 text-[#686681] transition hover:bg-white/[0.06] hover:text-white">
            <Ellipsis className="size-4" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3
        className={`text-sm font-semibold leading-5 ${
          task.status === "completed"
            ? "text-[#686681] line-through"
            : ""
        }`}
      >
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#8B89A8]">
          {task.description}
        </p>
      )}

      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {task.labels.map((label) => (
            <span
              key={label}
              className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-medium text-[#8B89A8]"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Bottom */}
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <div className="flex items-center gap-3 text-[11px] text-[#686681]">
          {task.dueDate && (
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              {task.dueDate}
            </span>
          )}

          {task.comments !== undefined && (
            <span className="flex items-center gap-1">
              <MessageSquare className="size-3.5" />
              {task.comments}
            </span>
          )}

          {task.attachments !== undefined && (
            <span className="flex items-center gap-1">
              <Paperclip className="size-3.5" />
              {task.attachments}
            </span>
          )}
        </div>

        <div className="flex size-7 items-center justify-center rounded-full bg-violet-400/10 text-[10px] font-semibold text-violet-300">
          AS
        </div>
      </div>

      {/* Delete action */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="mt-3 hidden w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs text-red-500 transition hover:bg-red-500/10 group-hover:flex"
        >
          <Trash2 className="size-3.5" />
          Delete task
        </button>
      )}
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* CREATE TASK DIALOG                                                          */
/* -------------------------------------------------------------------------- */

function CreateTaskDialog({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (task: Omit<Task, "id">) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] =
    useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) return;

    onCreate({
      title: title.trim(),
      description: description.trim(),
      status: "todo",
      priority,
      dueDate: dueDate || undefined,
      labels: [],
      comments: 0,
      attachments: 0,
      project: "Orbit Ops",
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0d0f1e] text-white shadow-2xl shadow-black/60"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="font-semibold">Create Task</h2>
            <p className="mt-1 text-xs text-[#8B89A8]">
              Add a new task to your To Do list.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#686681] transition hover:bg-white/[0.06] hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Task title
            </label>

            <input
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Implement user authentication"
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#080812] px-3 text-sm text-white outline-none transition placeholder:text-[#686681] focus:border-violet-500/50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Describe what needs to be done..."
              rows={4}
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#080812] p-3 text-sm text-white outline-none transition placeholder:text-[#686681] focus:border-violet-500/50"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Priority
              </label>

              <select
                value={priority}
                onChange={(event) =>
                  setPriority(
                    event.target.value as TaskPriority,
                  )
                }
                className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#080812] px-3 text-sm text-white outline-none focus:border-violet-500/50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Due date
              </label>

              <input
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
                className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#080812] px-3 text-sm text-white outline-none focus:border-violet-500/50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-white/[0.08] px-4 text-sm font-medium text-[#D9D7EA] transition hover:bg-white/[0.06]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!title.trim()}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="size-4" />
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
