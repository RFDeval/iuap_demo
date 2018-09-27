package com.yonyou.iuap.order.utils;

public class Outer<E>
{
    private E value;

    public Outer() {}

    public Outer(E value)
    {
        this.value = value;
    }

    public E value()
    {
        return this.value;
    }

    public void setValue(E value)
    {
        this.value = value;
    }
}
