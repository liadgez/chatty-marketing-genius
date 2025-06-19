
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Square, Plus, Settings, Clock, CheckCircle } from "lucide-react";

interface Task {
  id: string;
  name: string;
  type: "ab_test" | "anomaly_detection" | "optimization" | "quality_check";
  status: "running" | "completed" | "pending" | "paused";
  progress: number;
  startTime: Date;
  estimatedCompletion: Date;
}

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "Campaign 2024-Q2 A/B Test",
      type: "ab_test",
      status: "running",
      progress: 67,
      startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() + 2 * 60 * 60 * 1000)
    },
    {
      id: "2",
      name: "Revenue Stream Anomaly Detection",
      type: "anomaly_detection",
      status: "completed",
      progress: 100,
      startTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: "3",
      name: "Landing Page Optimization",
      type: "optimization",
      status: "pending",
      progress: 0,
      startTime: new Date(),
      estimatedCompletion: new Date(Date.now() + 6 * 60 * 60 * 1000)
    }
  ]);

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    type: "ab_test" as const
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "paused": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ab_test": return "A/B Test";
      case "anomaly_detection": return "Anomaly Detection";
      case "optimization": return "Optimization";
      case "quality_check": return "Quality Check";
      default: return type;
    }
  };

  const handleCreateTask = () => {
    if (!newTask.name) return;
    
    const task: Task = {
      id: Date.now().toString(),
      name: newTask.name,
      type: newTask.type,
      status: "pending",
      progress: 0,
      startTime: new Date(),
      estimatedCompletion: new Date(Date.now() + 4 * 60 * 60 * 1000)
    };

    setTasks(prev => [...prev, task]);
    setNewTask({ name: "", type: "ab_test" });
    setShowNewTaskForm(false);
  };

  const handleTaskAction = (taskId: string, action: "start" | "pause" | "stop") => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        switch (action) {
          case "start":
            return { ...task, status: "running" as const };
          case "pause":
            return { ...task, status: "paused" as const };
          case "stop":
            return { ...task, status: "pending" as const, progress: 0 };
          default:
            return task;
        }
      }
      return task;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Task Management</h2>
        <Button 
          onClick={() => setShowNewTaskForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* New Task Form */}
      {showNewTaskForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Create New Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Task Name</label>
              <Input
                value={newTask.name}
                onChange={(e) => setNewTask(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter task name..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Task Type</label>
              <Select value={newTask.type} onValueChange={(value: any) => setNewTask(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ab_test">A/B Test</SelectItem>
                  <SelectItem value="anomaly_detection">Anomaly Detection</SelectItem>
                  <SelectItem value="optimization">Optimization</SelectItem>
                  <SelectItem value="quality_check">Quality Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-700">
                Create Task
              </Button>
              <Button variant="outline" onClick={() => setShowNewTaskForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Running</p>
                <p className="text-2xl font-bold text-blue-600">
                  {tasks.filter(t => t.status === "running").length}
                </p>
              </div>
              <Play className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {tasks.filter(t => t.status === "completed").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {tasks.filter(t => t.status === "pending").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total</p>
                <p className="text-2xl font-bold text-slate-800">{tasks.length}</p>
              </div>
              <Settings className="w-8 h-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-slate-800">{task.name}</h3>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <Badge variant="outline">
                      {getTypeLabel(task.type)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span>Started: {task.startTime.toLocaleString()}</span>
                    <span>ETA: {task.estimatedCompletion.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {task.status === "pending" && (
                    <Button 
                      size="sm" 
                      onClick={() => handleTaskAction(task.id, "start")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  {task.status === "running" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleTaskAction(task.id, "pause")}
                    >
                      <Pause className="w-4 h-4" />
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleTaskAction(task.id, "stop")}
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {task.status === "running" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
