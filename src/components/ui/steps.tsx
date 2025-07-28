import React from 'react';
import { cn } from '../../lib/utils';

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
}


interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
    index?: number;
    isLast?: boolean;
    orientation?: 'horizontal' | 'vertical';
    title?: string;
}


const Step = React.forwardRef<HTMLDivElement, StepProps>(
    (
        {
            className,
            index = 0,
            isLast = false,
            orientation = 'horizontal',
            title,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'flex items-center',
                    orientation === 'horizontal' ? 'flex-row' : 'flex-col',
                    className
                )}
                {...props}
            >
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                        {index + 1}
                    </div>
                    {!isLast && (
                        <div
                            className={cn(
                                'bg-border',
                                orientation === 'horizontal' ? 'w-px h-4' : 'h-px w-4'
                            )}
                        />
                    )}
                </div>
                <div
                    className={cn(
                        'flex-1',
                        orientation === 'horizontal' ? 'ml-4' : 'mt-4'
                    )}
                >
                    {title && (
                        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                    )}
                    {children && (
                        <div className="text-sm text-muted-foreground mt-1">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);



const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
    ({ className, orientation = 'horizontal', children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'flex',
                    orientation === 'horizontal' ? 'flex-row' : 'flex-col',
                    className
                )}
                {...props}
            >
                {React.Children.map(children, (child, index) => {
                    if (React.isValidElement<StepProps>(child)) {
                        return React.cloneElement(child, {
                            index,
                            orientation,
                            isLast: index === React.Children.count(children) - 1,
                        } as Partial<StepProps>);
                    }
                    return child;
                })}
            </div>
        );
    }
);

Steps.displayName = 'Steps';

Step.displayName = 'Step';


export { Steps ,Step};