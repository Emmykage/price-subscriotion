"use client"
import { useState } from "react";
import { Card, Button, Typography, List, Tag, Modal, Form, Input  } from "antd";
import { CheckOutlined } from "@ant-design/icons";


const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
];

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    price: { monthly: "$5" },
    description: "Perfect for individual users just getting started.",
    features: ["2 active projects", "1GB storage", "Email support"],
    mostPopular: false,
  },
  {
    name: "Professional",
    id: "tier-professional",
    price: { monthly: "$15" },
    description: "More power for small teams who want to do more.",
    features: [
      "15 active projects",
      "10GB storage",
      "Priority email support",
      "Project history",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    price: { monthly: "$30" },
    description: "All the flexibility and power your team needs.",
    features: [
      "Unlimited active projects",
      "Unlimited storage",
      "Priority email support",
      "Project history",
      "Team collaboration",
    ],
    mostPopular: false,
  },
];

export default function Pricing() {
  const [visible, setVisible] = useState(false);
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [email, setEmail] = useState({email: ""})

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };


  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */
  
  // const onFinish = (values) => {
  //   console.log(values);
  // };

  const redirectToCheckout = async () => {
   const response  =  await fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email})
   }).then(res => res.json())
   console.log(response)
  }
  

  const handleChange = (e) => {
    setEmail({
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between relative">
      <div className="bg-gray-300">


      <Button type="primary" onClick={showModal} className="bg-blue-300">
        Upgrade to Pro
      </Button>

      {/* ===================form================================ */}


      <Form
   
  >
    
    <Form.Item
      
      name={['user', 'email']}
      label="Email"
      rules={[
        {
          type: 'email',
        },
      ]}
    >
      <Input name="email" value={email} onChange={handleChange}  />
    </Form.Item>
  </Form>
  </div>

  {/* ===============================================form end ================================================= */}

      <Modal
        title="Pricing"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        centered
      >
        <Typography.Title level={4}>
          Pricing plans for teams of all sizes
        </Typography.Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          {tiers.map((tier) => (
            <Card
              title={tier.name}
              bordered={tier.mostPopular}
              style={{ width: "30%", margin: "0 10px" }}
              extra={
                tier.mostPopular ? <Tag color="blue">Most popular</Tag> : null
              }
              key={tier.id}
            >
              <p>{tier.description}</p>
              <Typography.Text strong>
                {tier.price[frequency.value]}
                {frequency.priceSuffix}
              </Typography.Text>
              <Button onClick={redirectToCheckout} type={tier.mostPopular ? "primary" : "default"} block>
                Buy plan
              </Button>
              <List
                itemLayout="horizontal"
                dataSource={tier.features}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<CheckOutlined style={{ color: "blue" }} />}
                      title={item}
                    />
                  </List.Item>
                )}
              />
            </Card>
          ))}
        </div>
      </Modal>
    </div>
  );
}