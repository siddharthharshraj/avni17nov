/**
 * Audit Trail Page
 * Shows immutable audit logs for all user activities
 */

import { Metadata } from 'next';
import AuditTrail from '@/components/cms/AuditTrail';

export const metadata: Metadata = {
  title: 'Audit Trail | Avni CMS',
  description: 'View audit logs of all user activities',
};

export default function AuditTrailPage() {
  return <AuditTrail />;
}
