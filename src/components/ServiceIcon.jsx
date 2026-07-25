import {
  SmileOutlined,
  ToolOutlined,
  AlignCenterOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const iconMap = {
  tooth: <HeartOutlined />,
  smile: <SmileOutlined />,
  'tooth-outline': <ToolOutlined />,
  align: <AlignCenterOutlined />,
  medical: <MedicineBoxOutlined />,
  child: <UserOutlined />,
};

export default function ServiceIcon({ name }) {
  return iconMap[name] || <HeartOutlined />;
}
