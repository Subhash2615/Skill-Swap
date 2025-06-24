import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Layout from '../components/Layout';
import { Card, CardBody, CardHeader, Badge, Avatar } from '../components/ui';

interface Appointment {
  _id: string;
  participants: { _id: string; name: string; email: string; avatar?: string }[];
  createdBy: string;
  meetingLink: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  recurrence?: {
    frequency: 'none' | 'daily' | 'weekly' | 'monthly';
    interval?: number;
    count?: number;
    until?: string;
  };
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Appointment[]>('/users/appointments').then(res => {
      setAppointments(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">My Appointments</h1>
        <p className="text-neutral-600">All your scheduled, completed, and cancelled appointments.</p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : appointments.length === 0 ? (
        <div className="text-neutral-500">You have no appointments yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map(app => (
            <Card key={app._id} hover>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Badge variant={app.status === 'scheduled' ? 'success' : app.status === 'completed' ? 'primary' : 'error'}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                  <div className="font-semibold text-lg">{app.title}</div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="mb-2 text-neutral-700">{app.description}</div>
                <div className="mb-2 text-sm text-neutral-500">
                  {new Date(app.startTime).toLocaleString()} - {new Date(app.endTime).toLocaleTimeString()}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Meeting Link: </span>
                  <a href={app.meetingLink} target="_blank" rel="noopener noreferrer" className="text-primary-700 underline break-all">{app.meetingLink}</a>
                </div>
                <div className="mb-2 flex flex-wrap gap-2">
                  {app.participants.map(p => (
                    <span key={p._id} className="flex items-center gap-1">
                      <Avatar name={p.name} src={p.avatar} size="sm" />
                      <span className="text-sm">{p.name}</span>
                    </span>
                  ))}
                </div>
                {app.recurrence && app.recurrence.frequency !== 'none' && (
                  <div className="text-xs text-neutral-500 mt-2">
                    Recurs: {app.recurrence.frequency} every {app.recurrence.interval || 1} time(s)
                    {app.recurrence.count && `, ${app.recurrence.count} times`}
                    {app.recurrence.until && `, until ${new Date(app.recurrence.until).toLocaleDateString()}`}
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Appointments; 