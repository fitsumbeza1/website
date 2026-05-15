import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCMS } from "@/contexts/CMSContext";
import { Message } from "@/types/cms";
import { Trash2, Mail, Eye, EyeOff } from "lucide-react";

const MessagesManager: React.FC = () => {
  const { getMessages, markMessageAsRead, deleteMessage } = useCMS();
  const messages = getMessages();

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const unreadCount = messages.filter(m => !m.read).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markMessageAsRead(message._id);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteMessage(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Messages</h2>
          {unreadCount > 0 && (
            <Badge variant="default" className="bg-ruby">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="w-[150px]">Date</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message._id} className={!message.read ? "bg-muted/50" : ""}>
                <TableCell>
                  {message.read ? (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      Read
                    </Badge>
                  ) : (
                    <Badge variant="default" className="bg-ruby flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      New
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="font-medium">{message.name}</TableCell>
                <TableCell>
                  <a href={`mailto:${message.email}`} className="hover:text-ruby transition-colors">
                    {message.email}
                  </a>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {message.company || "-"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(message.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewMessage(message)}
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(message._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {messages.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No messages yet. Messages from the contact form will appear here.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedMessage.email}`} className="hover:text-ruby">
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground">Company</p>
                  <p>{selectedMessage.company || "Not provided"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Date</p>
                  <p>{formatDate(selectedMessage.createdAt)}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Message</p>
                <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedMessage.email}`)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesManager;
