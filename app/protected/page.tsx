import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Avatar, Button, List, ListItemText, ListItem } from "@mui/material";

export default async function ProtectedPage({ searchParams }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const selectedProject = searchParams?.project || null;

  return (
    <div className="flex h-screen">
      {/* Left Sidebar (Sticky Navigation) */}
      <aside className="w-64 bg-gray-100 p-4 border-r border-gray-300 flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <Avatar alt={user.email} src="/user-avatar.png" />
            <div>
              <p className="text-sm font-semibold">{user.email}</p>
              <p className="text-sm text-gray-500">User</p>
            </div>
          </div>
          <List>
            {["Models", "Bill of Material", "Heat Load", "Cooling Load"].map((item) => (
              <ListItem
                key={item}
                className="text-red-600 hover:bg-gray-200"
                component="a"
                href={`?project=${item}`}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </div>
        <Button variant="outlined" fullWidth className="mt-auto">Profile</Button>
      </aside>

      {/* Main Content (Expands to Fill Remaining Space) */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="border p-4 min-h-[500px] flex items-center justify-center bg-green-50">
          {selectedProject ? (
            <p className="text-green-600 text-lg">Displaying Data for {selectedProject}</p>
          ) : (
            <p className="text-gray-400">Select a project to view tables & charts</p>
          )}
        </div>
      </main>
    </div>
  );
}
