import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { Authorization, ROLES } from '@/features/auth';
import { useNotifications } from '@/stores/notifications';

import { useDeleteDiscussion } from '../api/delete-discussion';

type DeleteDiscussionProps = {
  id: string;
};

export const DeleteDiscussion = ({ id }: DeleteDiscussionProps) => {
  const { addNotification } = useNotifications();
  const deleteDiscussionMutation = useDeleteDiscussion({
    config: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Discussion Deleted',
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Discussion"
        body="Are you sure you want to delete this discussion?"
        triggerButton={
          <Button variant="destructive" icon={<Trash className="size-4" />}>
            Delete Discussion
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteDiscussionMutation.isPending}
            type="button"
            variant="destructive"
            onClick={() =>
              deleteDiscussionMutation.mutate({ discussionId: id })
            }
          >
            Delete Discussion
          </Button>
        }
      />
    </Authorization>
  );
};
