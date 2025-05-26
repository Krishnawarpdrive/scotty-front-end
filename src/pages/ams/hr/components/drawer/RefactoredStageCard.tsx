<Card
  ref={ref}
  data-handler-id={handlerId}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  sx={{
    minWidth: '240px',
    maxWidth: '240px',
    height: 'auto',
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'default',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    borderLeft: `4px solid ${categoryColor}`,
    position: 'relative',
    boxShadow: 'none',
    backgroundColor: '#fff',
    p: 1.5,
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
      transform: 'translateY(-2px)',
    },
  }}
>
  <CardContent
    sx={{
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
    }}
  >
    {/* Keep your internal components like StageHeader, StageStatus, etc. here */}
  </CardContent>
</Card>
