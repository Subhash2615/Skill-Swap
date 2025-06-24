import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Layout from '../components/Layout';
import { Card, CardBody, CardHeader, Button, Avatar, Badge, Input, Alert } from '../components/ui';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills_to_teach?: string[];
  skills_to_learn?: string[];
}

interface AppointmentForm {
  meetingLink: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  recurrence?: {
    frequency: 'none' | 'daily' | 'weekly' | 'monthly';
    interval?: number;
    count?: number;
    until?: string;
  };
}

const Connections: React.FC = () => {
  const [connections, setConnections] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form, setForm] = useState<AppointmentForm>({
    meetingLink: '',
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    recurrence: { frequency: 'none' },
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<User[]>('/users/connections').then(res => {
      setConnections(res.data);
      setLoading(false);
    });
  }, []);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setForm({
      meetingLink: '',
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      recurrence: { frequency: 'none' },
    });
    setShowModal(true);
    setSuccess('');
    setError('');
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('recurrence.')) {
      setForm(prev => ({
        ...prev,
        recurrence: {
          ...prev.recurrence,
          [name.split('.')[1]]: value || 'none',
          frequency: name.split('.')[1] === 'frequency' ? (value as 'none' | 'daily' | 'weekly' | 'monthly') : prev.recurrence?.frequency || 'none',
        },
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');
    try {
      await axios.post('/users/appointments', {
        participantIds: [selectedUser?._id],
        ...form,
        recurrence: form.recurrence?.frequency === 'none' ? undefined : form.recurrence,
      });
      setSuccess('Appointment created successfully!');
      setShowModal(false);
      setTimeout(() => navigate('/appointments'), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create appointment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">My Connections</h1>
        <p className="text-neutral-600">People you are connected with. Click "Make Appointment" to schedule a meeting.</p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : connections.length === 0 ? (
        <div className="text-neutral-500">You have no connections yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map(user => (
            <Card key={user._id} hover>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar name={user.name} src={user.avatar} size="md" />
                  <div>
                    <div className="font-semibold text-lg">{user.name}</div>
                    <div className="text-sm text-neutral-500">{user.email}</div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                {user.bio && <div className="mb-2 text-neutral-700">{user.bio}</div>}
                <div className="flex flex-wrap gap-2 mb-2">
                  {user.skills_to_teach?.map(skill => (
                    <Badge key={skill} variant="primary">{skill}</Badge>
                  ))}
                  {user.skills_to_learn?.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                <Button size="sm" variant="primary" onClick={() => openModal(user)}>
                  Make Appointment
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for creating appointment */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-large p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700" onClick={closeModal} aria-label="Close">&times;</button>
            <h2 className="text-2xl font-bold mb-4">Create Appointment with {selectedUser.name}</h2>
            {error && <Alert variant="error" className="mb-2">{error}</Alert>}
            {success && <Alert variant="success" className="mb-2">{success}</Alert>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Meeting Link" name="meetingLink" value={form.meetingLink} onChange={handleFormChange} required />
              <Input label="Title" name="title" value={form.title} onChange={handleFormChange} required />
              <Input label="Description" name="description" value={form.description} onChange={handleFormChange} />
              <div className="flex gap-4">
                <Input label="Start Time" name="startTime" type="datetime-local" value={form.startTime} onChange={handleFormChange} required />
                <Input label="End Time" name="endTime" type="datetime-local" value={form.endTime} onChange={handleFormChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Recurrence</label>
                <select aria-label="Recurrence Frequency" name="recurrence.frequency" value={form.recurrence?.frequency || 'none'} onChange={handleFormChange} className="input">
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                {form.recurrence?.frequency !== 'none' && (
                  <div className="flex gap-2 mt-2">
                    <Input label="Interval" name="recurrence.interval" type="number" value={form.recurrence?.interval || 1} onChange={handleFormChange} min={1} />
                    <Input label="Count" name="recurrence.count" type="number" value={form.recurrence?.count || ''} onChange={handleFormChange} min={1} />
                    <Input label="Until" name="recurrence.until" type="date" value={form.recurrence?.until || ''} onChange={handleFormChange} />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={closeModal} disabled={submitting}>Cancel</Button>
                <Button type="submit" variant="primary" loading={submitting}>Create</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Connections; 