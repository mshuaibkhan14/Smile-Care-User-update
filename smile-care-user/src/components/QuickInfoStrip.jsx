import {
  SafetyOutlined,
  SmileOutlined,
  ToolOutlined,
  AlignCenterOutlined,
  TeamOutlined,
  AlertOutlined,
} from '@ant-design/icons';
import './QuickInfoStrip.css';

const items = [
  { icon: <SafetyOutlined />, title: 'Preventive Care', desc: 'Keep your smile healthy' },
  { icon: <SmileOutlined />, title: 'Cosmetic Dentistry', desc: 'Enhance your natural beauty' },
  { icon: <ToolOutlined />, title: 'Dental Implants', desc: 'Restore your smile with confidence' },
  { icon: <AlignCenterOutlined />, title: 'Orthodontics', desc: 'Straighten your smile comfortably' },
  { icon: <TeamOutlined />, title: 'Pediatric Dentistry', desc: 'Gentle care for little smiles' },
  { icon: <AlertOutlined />, title: 'Emergency Care', desc: "We're here when you need us" },
];

export default function QuickInfoStrip() {
  return (
    <div className="container quick-strip">
      <div className="quick-strip__card">
        {items.map((item) => (
          <div className="quick-strip__item" key={item.title}>
            <div className="quick-strip__icon">{item.icon}</div>
            <h5>{item.title}</h5>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
