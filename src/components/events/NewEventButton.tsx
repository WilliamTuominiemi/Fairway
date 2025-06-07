import Icon from '@/components/common/svgIcon';

export default function NewEventButton({
  handleNewEventButtonClick,
}: {
  handleNewEventButtonClick: () => void;
}) {
  return (
    <button
      className="w-35 flex flex-row justify-between bg-green-700 hover:bg-green-900 active:scale-95 p-4 rounded-md text-emerald-50 transition-transform duration-75"
      onClick={handleNewEventButtonClick}
      data-testid="add-event-button"
    >
      New Event
      <Icon iconName="golf"></Icon>
    </button>
  );
}
