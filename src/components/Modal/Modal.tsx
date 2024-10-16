import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

const modalVariant = cva("w-screen h-screen absolute top-0 left-0 z-20 ", {
  variants: {
    isDim: {
      true: "bg-black bg-opacity-45",
      false: "bg-transparent",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    isDim: true,
  },
});

type ModalVariant = VariantProps<typeof modalVariant>;

type PassedModalProps = {
  className?: string;
  onClickFn: ComponentProps<"div">["onClick"];
};

type ModalProps = PassedModalProps & ModalVariant;

function Modal({
  isDim,
  className,
  onClickFn,
  children,
  dim,
}: PropsWithChildren<ModalProps>) {
  return (
    <div
      className={`${className} ${modalVariant({ isDim })}`}
      onClick={onClickFn}
    >
      {children}
    </div>
  );
}

export default Modal;
