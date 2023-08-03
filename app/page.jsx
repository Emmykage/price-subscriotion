"use client"
import { useState } from "react";
import { Card, Button, Typography, List, Tag, Modal, Form, Input } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
];

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    price_id: "price_1NYYq6HxI0r7Hp29egopeVal",
    price: { monthly: "$5" },
    description: "Perfect for individual users just getting started.",
    features: ["2 active projects", "1GB storage", "Email support"],
    mostPopular: false,
  },
  {
    name: "Professional",
    id: "tier-professional",
    price_id: "price_1NYYsKHxI0r7Hp29TyM30ktU",
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
    price_id: "price_1NYYvCHxI0r7Hp29ESNneauM",
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
  const [email, setEmail] = useState({ email: "" })

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const redirectToCheckout = async (price_id) => {
    const { session } = await fetch('/api/stripe', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, lineItems: [{ price: price_id, quantity: 1 }] })
    }).then(res => res.json())

    console.log(session)

    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({ sessionId: session.id })

    if (error) {
      if (error instanceof Error) throw new Error(error.message)
    } else {
      throw error
    }

    console.log(session.id)
  }


  const handleChange = (e) => {
    setEmail({
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center relative">
      <div className="bg-gray-300 w-5/12 text-center px-7">


        <Button type="primary" onClick={showModal} className="bg-blue-300 m-7">
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
            <Input name="email" value={email} onChange={handleChange} />
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
              <Button onClick={() => redirectToCheckout(tier.price_id)} type={tier.mostPopular ? "primary" : "default"} block>
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