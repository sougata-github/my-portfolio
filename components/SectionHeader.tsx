/*
  Standard section header: label on the left, optional action on the right,
  then a rule beneath.

  The negative margins cancel the Section container's horizontal padding so
  the rule meets the vertical border-x on both sides, the same trick the hero
  strip uses. Without them the rule floats inside the column and stops
  reading as part of the border grid.
*/
const SectionHeader = ({
  label,
  action,
}: {
  label: string;
  action?: React.ReactNode;
}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-x-4">
        <span className="label">{label}</span>
        {action}
      </div>
      <div className="-mx-4 mt-5 border-b border-border md:-mx-8" />
    </div>
  );
};

export default SectionHeader;
