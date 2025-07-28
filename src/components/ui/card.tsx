import * as React from "react"

import { cn } from '../../lib/utils';

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-docs"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}


interface CardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: number;
    gap?: number;
}


const CardGroup = React.forwardRef<HTMLDivElement, CardGroupProps>(
    ({ className, cols = 1, gap = 4, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'grid',
                    `gap-${gap}`,
                    className
                )}
                style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gap: `${gap * 0.25}rem`,
                }}
                {...props}
            >
                {React.Children.map(children, (child) => {
                    if (React.isValidElement<CardGroupProps>(child)) {
                        return React.cloneElement(child, {
                            className: cn('h-full', child.props.className),
                        });
                    }
                    return child;
                })}
            </div>
        );
    }
);


export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardGroup
}
