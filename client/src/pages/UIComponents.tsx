import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Button, 
  Input, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Badge, 
  Alert, 
  Avatar, 
  SkillTag, 
  LoadingSpinner 
} from '../components/ui';

const UIComponents: React.FC = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js']);

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
            SkillSwap UI Framework
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            A comprehensive design system built with Tailwind CSS and React TypeScript
          </p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-neutral-900">Buttons</h2>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Button Variants</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="error">Error</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Button Sizes</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Button States</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-4">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline" leftIcon={<span>←</span>}>
                  With Left Icon
                </Button>
                <Button variant="outline" rightIcon={<span>→</span>}>
                  With Right Icon
                </Button>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-neutral-900">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Basic Inputs</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input 
                  label="Email Address" 
                  placeholder="Enter your email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Input 
                  label="Password" 
                  type="password" 
                  placeholder="Enter your password"
                />
                <Input 
                  label="With Error" 
                  placeholder="This input has an error"
                  error="This field is required"
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Input with Icons</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input 
                  label="Search" 
                  placeholder="Search skills..."
                  leftIcon={<span>🔍</span>}
                />
                <Input 
                  label="Email" 
                  placeholder="Enter email"
                  leftIcon={<span>📧</span>}
                  rightIcon={<span>✓</span>}
                />
                <Input 
                  label="Helper Text" 
                  placeholder="With helper text"
                  helperText="This is some helpful text below the input"
                />
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-neutral-900">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card hover>
              <CardHeader>
                <h3 className="text-lg font-medium">Basic Card</h3>
              </CardHeader>
              <CardBody>
                <p className="text-neutral-600">
                  This is a basic card with header, body, and footer sections.
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardBody>
                <div className="text-center">
                  <Avatar name="John Doe" size="lg" className="mx-auto mb-4" />
                  <h3 className="text-lg font-medium">John Doe</h3>
                  <p className="text-neutral-600">Frontend Developer</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <Badge variant="primary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Interactive Card</h3>
              </CardHeader>
              <CardBody>
                <p className="text-neutral-600 mb-4">
                  This card has hover effects and can be clicked.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Click to view details</span>
                  <span>→</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-neutral-900">Badges</h2>
          <Card>
            <CardBody>
              <div className="flex flex-wrap gap-4">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Alerts Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-neutral-900">Alerts</h2>
          <div className="space-y-4">
            {showAlert && (
              <Alert 
                variant="info" 
                title="Information"
                onClose={() => setShowAlert(false)}
              >
                This is an informational alert that can be dismissed.
              </Alert>
            )}
            <Alert variant="success" title="Success">
              Your profile has been updated successfully!
            </Alert>
            <Alert variant="warning" title="Warning">
              Please complete your profile to get better matches.
            </Alert>
            <Alert variant="error" title="Error">
              There was an error processing your request.
            </Alert>
          </div>
        </section>

        {/* Avatars Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-neutral-900">Avatars</h2>
          <Card>
            <CardBody>
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <Avatar name="John Doe" size="sm" className="mx-auto mb-2" />
                  <span className="text-sm text-neutral-600">Small</span>
                </div>
                <div className="text-center">
                  <Avatar name="Jane Smith" size="md" className="mx-auto mb-2" />
                  <span className="text-sm text-neutral-600">Medium</span>
                </div>
                <div className="text-center">
                  <Avatar name="Bob Johnson" size="lg" className="mx-auto mb-2" />
                  <span className="text-sm text-neutral-600">Large</span>
                </div>
                <div className="text-center">
                  <Avatar name="Alice Brown" size="xl" className="mx-auto mb-2" />
                  <span className="text-sm text-neutral-600">Extra Large</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Skill Tags Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-neutral-900">Skill Tags</h2>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Skill Tags with Levels</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-3">
                <SkillTag skill="React" level="expert" />
                <SkillTag skill="TypeScript" level="advanced" />
                <SkillTag skill="Node.js" level="intermediate" />
                <SkillTag skill="Python" level="beginner" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Removable Skill Tags</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-3">
                {skills.map(skill => (
                  <SkillTag 
                    key={skill} 
                    skill={skill} 
                    removable 
                    onRemove={removeSkill}
                  />
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Loading States Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-neutral-900">Loading States</h2>
          <Card>
            <CardBody>
              <div className="flex flex-wrap items-center gap-8">
                <div className="text-center">
                  <LoadingSpinner size="sm" className="mx-auto mb-2" />
                  <span className="text-sm text-neutral-600">Small</span>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" className="mx-auto mb-2" />
                  <span className="text-sm text-neutral-600">Medium</span>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" className="mx-auto mb-2" />
                  <span className="text-sm text-neutral-600">Large</span>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="xl" className="mx-auto mb-2" />
                  <span className="text-sm text-neutral-600">Extra Large</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default UIComponents; 