"use client";

import {
  Panel,
  PageHead as BasePageHead,
  Th,
  ConfirmDialog,
  chartTooltip,
} from "@/components/owner/shared";
import { useI18n } from "@/hooks/useI18n";

export { Panel, Th, ConfirmDialog, chartTooltip };

export const AdminHead = (props: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => {
  const { t } = useI18n();
  return <BasePageHead {...props} eyebrow={t("admin.eyebrow")} />;
};

export const Empty = ({ label }: { label?: string }) => {
  const { t } = useI18n();
  return (
    <p className="py-10 text-center text-sm text-muted-foreground">
      {label ?? t("common.empty")}
    </p>
  );
};
